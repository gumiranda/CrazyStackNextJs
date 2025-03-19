export type PhotoProps = {
  _id: string;
  key: string;
  createdById: string;
  image: string;
  url: string;
  provider: string;
  expiresIn: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};

class Photo {
  protected props: PhotoProps;
  constructor(props: PhotoProps) {
    this.props = props;
  }
  public static build(props: PhotoProps) {
    return new Photo(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  get key(): string {
    return this.props.key;
  }
  get image(): string {
    return this.props.image;
  }
  get url(): string {
    return this.props.url;
  }
  get provider(): string {
    return this.props.provider;
  }
  get expiresIn(): string {
    return this.props.expiresIn;
  }
  get createdById(): string {
    return this.props.createdById;
  }
  get updatedAt(): string {
    return this.props.updatedAt;
  }

  format(): PhotoProps {
    return {
      ...this.props,
      _id: this.props._id,
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const photoModel = (props: PhotoProps) => Photo.build(props);
