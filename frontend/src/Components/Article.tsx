interface Props {
  image: string;
}
function Article({ image }: Props) {
  console.log(image);
  return (
    <article className="min-h-screen min-w-4/5 bg-amber-200">
      <img src={image} className="float-right m-12 w-1/2" />
    </article>
  );
}

export default Article;
