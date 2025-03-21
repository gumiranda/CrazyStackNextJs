import { formatDistanceToNow } from "date-fns";

export type TweetProps = {
  _id: string;
  userSlug: string;
  body: string;
  image: string;
  tweetId: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  createdById: string;
  retweets: number;
  distanceNow: string;
  createdBy: {
    slug: string;
    photo: string;
    name: string;
  };
  tweetlike: {
    tweetlikes: {
      _id: string;
      createdById: string;
      userSlug: string;
      createdAt: string;
      updatedAt: string;
    }[];
    total: number;
  };
};

class Tweet {
  protected props: TweetProps;
  constructor(props: TweetProps) {
    this.props = props;
  }
  public static build(props: TweetProps) {
    return new Tweet(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get userSlug(): string {
    return this.props.userSlug;
  }
  get body(): string {
    return this.props.body;
  }
  get image(): string {
    return this.props.image;
  }
  get tweetId(): string {
    return this.props.tweetId;
  }
  get updatedAt(): string {
    return this.props.updatedAt;
  }
  get createdById(): string {
    return this.props.createdById;
  }
  get retweets(): number {
    return this.props.retweets;
  }
  get distanceNow(): string {
    return this.props.distanceNow;
  }

  get createdBy(): {
    slug: string;
    photo: string;
    name: string;
  } {
    return this.props.createdBy;
  }
  get tweetlike(): {
    tweetlikes: {
      _id: string;
      createdById: string;
      userSlug: string;
      createdAt: string;
      updatedAt: string;
    }[];
    total: number;
  } {
    return this.props.tweetlike;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  format(): TweetProps {
    return {
      ...this.props,
      _id: this.props._id,
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      distanceNow: formatDistanceToNow(new Date(this.props.createdAt), {
        addSuffix: true,
      }),
    };
  }
}
export const tweetModel = (props: TweetProps) => Tweet.build(props);
