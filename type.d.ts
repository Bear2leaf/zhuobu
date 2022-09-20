

type Vec3 = Float32Array | [number, number, number]
type Mat4 = Float32Array | [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]
type WxRequestResponse = { data: string, statusCode: number, header: {}, cookies: Array<string> }
type WxRequestError = { errMsg: string, errno: number }
type Image = HTMLImageElement

declare const wx: any;