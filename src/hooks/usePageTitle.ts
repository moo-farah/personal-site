import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `Mohamed Farah | ${title}` : 'Mohamed Farah';

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}; 