"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import useSWR from "swr";
import { useMemo } from "react";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface ProductData {
  name: string;
  [key: string]: any;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Breadcrumb() {
  const pathname = usePathname();

  // Memoize all computations
  const { segments, productIdSegment, shouldRender } = useMemo(() => {
    const shouldRender = pathname && pathname !== "/" && pathname !== "/404";
    const segments = shouldRender ? pathname.split("/").filter(Boolean) : [];
    const productIdSegment = segments.find((s) => /^\d+$/.test(s)) || null;

    return { segments, productIdSegment, shouldRender };
  }, [pathname]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const fetchUrl = productIdSegment
    ? `${baseUrl}/api/products/${productIdSegment}`
    : null;

  const {
    data: productData,
    error,
    isLoading,
  } = useSWR<ProductData>(fetchUrl, fetcher);

  if (!shouldRender) return null;

  const breadcrumbs: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isProductId = segment ? /^\d+$/.test(segment) : false;

    let label = segment ? decodeURIComponent(segment.replace(/-/g, " ")) : "";

    if (isProductId) {
      if (isLoading) {
        label = "Đang tải...";
      } else if (error) {
        label = "Không thể tải tên sản phẩm";
      } else if (productData) {
        label = productData.name;
      }
    } else {
      label = label.replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return { href, label };
  });

  return (
    <nav className="text-sm text-gray-400 mx-auto py-10 px-4 container">
      <Link href="/" className="hover:text-black">
        Trang chủ
      </Link>
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <span key={crumb.href}>
            <span className="px-2">
              <FaAngleRight className="inline" />
            </span>
            {isLast ? (
              <span className="text-black">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-black">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
