"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/404") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Lấy danh sách productId từ URL (các segment là số)
  const productIdSegment = segments.find((s) => /^\d+$/.test(s)) || null;
  const { data: productData, error } = useSWR(
    productIdSegment
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productIdSegment}`
      : null,
    fetcher
  );

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    let label = decodeURIComponent(segment.replace(/-/g, " "));
    const isProductId = /^\d+$/.test(segment);

    if (isProductId) {
      if (productData) label = productData.name;
      else if (error) label = "Không thể tải tên sản phẩm";
      else label = "Đang tải...";
    } else {
      label = label.replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return { href, label };
  });

  return (
    <nav className="text-sm text-gray-400 mx-auto py-10 px-4 container">
      <Link href="/" className="hover:text-black">
        Home
      </Link>
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <span key={idx}>
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
