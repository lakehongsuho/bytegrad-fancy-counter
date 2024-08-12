export default function Title({ locked }) {
  return (
    <h1 className="title">
      {locked ? (
        <span>
          limit ! buy <b>pro</b> for &gt;5
        </span>
      ) : (
        "fancy counter"
      )}
    </h1>
  );
}
