type Props = {
  imageUrl: string;
  caption: string;
  onClick: () => void;
};

export default function ImageCard({ imageUrl, caption, onClick }: Props) {
  return (
    <figure
      onClick={onClick}
      className="hover:cursor-pointer hover:scale-105 transition-all overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow"
    >
      <img className="w-full aspect-[4/3] p-8" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-mtext border-border p-4">
        {caption}
      </figcaption>
    </figure>
  );
}
