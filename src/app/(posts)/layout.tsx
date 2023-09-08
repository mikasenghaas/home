interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return <div className="container px-0 lg:px-[4rem]">{children}</div>;
}
