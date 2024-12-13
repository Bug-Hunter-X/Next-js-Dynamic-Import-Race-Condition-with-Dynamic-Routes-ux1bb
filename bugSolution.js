import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyComponent() {
  const router = useRouter();
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      if (router.isReady) {
        const componentPath = `/components/${router.query.id}`; //Make sure componentPath is available before importing
        const module = await import(componentPath);
        setComponent(module.default);
      }
    };

    loadComponent();
  }, [router.isReady, router.query.id]);

  if (!Component) {
    return <div>Loading...</div>;
  }

  return <Component/>;
}

export default MyComponent;