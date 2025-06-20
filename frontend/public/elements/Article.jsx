export default function Article(props) {
  return (
    <div className="max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-4">{props.title}</h1>
      {(props.paragraphs || []).map((p, i) => (
        <p key={i} className="mb-2">
          {p}
        </p>
      ))}
    </div>
  );
}
