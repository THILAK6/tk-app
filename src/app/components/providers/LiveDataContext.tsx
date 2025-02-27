"use client";

import {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

type LiveData = {
  currentValue: number;
  currentMeterPerMinute: number;
};

type LiveDataContext = {
  liveDataRef: React.MutableRefObject<LiveData>;
  liveData: LiveData;
  isConnected: boolean;
};

const defaultLiveData: LiveData = {
  currentValue: 0,
  currentMeterPerMinute: 0,
};

type LiveDataProviderProps = {
  children: ReactNode;
};

const LiveDataContext = createContext<LiveDataContext>({
  liveDataRef: { current: defaultLiveData },
  liveData: defaultLiveData,
  isConnected: false,
});

const hostUrl = process.env.NEXT_PUBLIC_HOST;

export const LiveDataProvider = ({ children }: LiveDataProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);

  const liveDataRef = useRef<LiveData>(defaultLiveData);

  const [liveData, setLiveData] = useState<LiveData>(defaultLiveData);

  useEffect(() => {
    console.log("use effect of LiveDataProvider");
    const eventSource = new EventSource(hostUrl + "/api/mqtt");

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as LiveData;
      console.log("Received message:", data);
      liveDataRef.current = data;
      setLiveData(data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <LiveDataContext.Provider value={{ liveDataRef, liveData, isConnected }}>
      {children}
    </LiveDataContext.Provider>
  );
};

export const useLiveData = () => useContext(LiveDataContext);
