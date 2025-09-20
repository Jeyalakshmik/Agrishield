type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-bold font-headline text-primary">{title}</h1>
      <p className="text-xl text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}
