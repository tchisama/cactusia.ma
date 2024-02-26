"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {}

function PixelEvents({}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("381880481127138"); //don't forget to change this
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
}

export default PixelEvents