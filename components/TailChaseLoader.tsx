import { useEffect, useState } from 'react';

const TailChaseLoader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex justify-center items-center h-64">
      <l-tail-chase
        size="40"
        speed="1.75"
        color="black"
      ></l-tail-chase>
    </div>
  );
};

export default TailChaseLoader;
