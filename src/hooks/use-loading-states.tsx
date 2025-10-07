import { useState, useCallback } from 'react';

export enum LoadingState {
  IDLE = 'idle',
  FETCHING = 'fetching',
  PARSING = 'parsing',
  RENDERING = 'rendering',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface UseLoadingStatesOptions {
  initialState?: LoadingState;
  fetchingDelay?: number;
  parsingDelay?: number;
  renderingDelay?: number;
}

interface UseLoadingStatesReturn {
  loadingState: LoadingState;
  error: string | null;
  isLoading: boolean;
  setLoadingState: (state: LoadingState) => void;
  setError: (error: string | null) => void;
  executeWithStates: (
    asyncFn: () => Promise<unknown>,
    options?: {
      skipDelays?: boolean;
      onSuccess?: (result: unknown) => void;
      onError?: (error: Error) => void;
    }
  ) => Promise<unknown>;
  reset: () => void;
}

export const useLoadingStates = ({
  initialState = LoadingState.IDLE,
  fetchingDelay = 300,
  parsingDelay = 200,
  renderingDelay = 100
}: UseLoadingStatesOptions = {}): UseLoadingStatesReturn => {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const isLoading = [
    LoadingState.FETCHING,
    LoadingState.PARSING,
    LoadingState.RENDERING
  ].includes(loadingState);

  const executeWithStates = useCallback(async (
    asyncFn: () => Promise<unknown>,
    options: {
      skipDelays?: boolean;
      onSuccess?: (result: unknown) => void;
      onError?: (error: Error) => void;
    } = {}
  ): Promise<unknown> => {
    const { skipDelays = false, onSuccess, onError } = options;
    
    try {
      setError(null);
      setLoadingState(LoadingState.FETCHING);
      
      if (!skipDelays) {
        await new Promise(resolve => setTimeout(resolve, fetchingDelay));
      }

      const result = await asyncFn();

      if (!skipDelays) {
        setLoadingState(LoadingState.PARSING);
        await new Promise(resolve => setTimeout(resolve, parsingDelay));

        setLoadingState(LoadingState.RENDERING);
        await new Promise(resolve => setTimeout(resolve, renderingDelay));
      }

      setLoadingState(LoadingState.SUCCESS);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setLoadingState(LoadingState.ERROR);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      return undefined;
    }
  }, [fetchingDelay, parsingDelay, renderingDelay]);

  const reset = useCallback(() => {
    setLoadingState(initialState);
    setError(null);
  }, [initialState]);

  return {
    loadingState,
    error,
    isLoading,
    setLoadingState,
    setError,
    executeWithStates,
    reset
  };
};

export default useLoadingStates;