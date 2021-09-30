export default function Container({ children }) {
  return (
    <section>
      <div className="container mx-auto">{children}</div>
    </section>
  );
}
