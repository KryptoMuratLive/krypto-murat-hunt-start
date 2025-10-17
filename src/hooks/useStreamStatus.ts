import { useState, useEffect } from 'react';

interface StreamStatus {
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  viewerCount: number;
}

export const useStreamStatus = (streamUrl: string) => {
  const [status, setStatus] = useState<StreamStatus>({
    isLive: false,
    isLoading: true,
    error: null,
    viewerCount: 0,
  });

  useEffect(() => {
    let isMounted = true;
    let checkInterval: NodeJS.Timeout;

    const checkStreamStatus = async () => {
      try {
        const response = await fetch(streamUrl, {
          method: 'HEAD',
          mode: 'no-cors',
        });

        if (isMounted) {
          // Since we're using no-cors, we can't read the status
          // We'll consider the stream live if the request doesn't fail
          setStatus({
            isLive: true,
            isLoading: false,
            error: null,
            viewerCount: Math.floor(Math.random() * 2000) + 500, // Mock viewer count
          });
        }
      } catch (error) {
        if (isMounted) {
          setStatus({
            isLive: false,
            isLoading: false,
            error: 'Stream offline',
            viewerCount: 0,
          });
        }
      }
    };

    // Initial check
    checkStreamStatus();

    // Check every 30 seconds
    checkInterval = setInterval(checkStreamStatus, 30000);

    return () => {
      isMounted = false;
      clearInterval(checkInterval);
    };
  }, [streamUrl]);

  return status;
};
