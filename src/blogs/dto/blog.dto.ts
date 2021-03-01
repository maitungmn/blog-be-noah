export interface IBlog extends IBlogMainInfos {
  _createBy: string;
  _createAt: Date;
}

export interface IBlogMainInfos {
  title: string;
  imageUrl: string;
  content: string;
}