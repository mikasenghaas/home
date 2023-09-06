interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return <div className="border-2 border-red-500">{children}</div>;
}
