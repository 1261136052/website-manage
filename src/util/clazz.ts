
export class category {
    id: bigint 
    categoryName: string
}
export interface Response {
    id: bigint 
    file: file
  }


export class file {
    id: any
    path: any
}
export class Goods {
    id: bigint 
    userId: any
    userName: string
    categoryId: any
    title: ''
    status: ''
    content: string
    price: Float32Array
    cover: ''
    filesIds: any[]
    transactionAddress: ''
    transactionDate: Date
    publish: Date
    files: any[]
}

export class order{
    id: bigint 
    goodsId:bigint 
    buyerId:bigint 
    buyerPhone:string
    buyDate:Date
    goods:Goods
}


export class article{
    id: bigint 
    articleCategoryId:bigint
    authorId:bigint 
    title:string 
    author:string 
    content:string
    cover:string
    publishDate:Date
    weight:number
    likeCount:number
    commentCount:number
}

export class category2 {
    id: bigint 
    name: string
}

export class User{
    id: bigint
    account:string
    userName:string
    pwd:string
    phoneNumber:string
    schoolName:string
    studentNumber:string
    email:string
    birthday:string
    loginTime:bigint
    grade:bigint
    loginDate:Date
}


export class AttentionDto {
     userId: bigint
     attentionId: bigint
     likeCount: number
     userName: string
     likeDate: Date
  }

  export class  GoodsChatDto {
    id: bigint;
    readerId: bigint;
    listenerId: bigint;
    content: string;
    publishDate: Date;
    reader: string;
    listener: string;
}


export class GoodsOrderDto {
    id: bigint;
    goodsId: bigint;
    buyerId: bigint;
    buyerPhone: string;
    buyDate: Date;
    remark: string;
    buyer: string;
    vendor: string;
    title: string;
    vendorId: bigint;
}

export class likeDto {
    articleId: bigint 
    userId: bigint 
    userName: string
    likeDate: Date
}