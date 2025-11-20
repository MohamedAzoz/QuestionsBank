export interface IResult<T> {
data: T,
isSuccess: boolean,
statusCode: number|null,
message: string|null
}
