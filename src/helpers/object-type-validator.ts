import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

/**
 * 傳入帶有 class-validator 裝飾器的 Class 和 object，驗證該 object 的 type 是否符合 class \
 * 不符合時會拋出 error 並附帶不符合的原因
 * @param cls property 帶有 class-validator 裝飾器的 Class
 * @param object 所要驗證的物件
 */
export function objectTypeValidator<T extends object>(cls: ClassConstructor<T>, object: object): object is T {
  const instance = plainToInstance(cls, object);
  const errors = validateSync(instance);
  if (errors.length > 0) {
    const errMsgs = iterateValidationError(errors);
    throw new Error(`來自系統外部收到的 object 格式不符合預期, 錯誤原因: ${errMsgs}`);
  }
  return errors?.length === 0;
}

/**
 * deep loop over ValidationError 物件，將所有錯誤輸出成一維的 String[]
 * @param {ValidationError[]} errors ValidationError 陣列
 * @returns 錯誤訊息 String 陣列
 */
export function iterateValidationError(errors: ValidationError[], errMsgs: string[] = []): string[] {
  errors.forEach((error) => {
    if (error.constraints != null)
      errMsgs.push(
        `\n欄位名稱: "${error.property}", 非法值: "${error.value}", 原因: "${JSON.stringify(error.constraints)}"`,
      );
    if (error.children != null) error.children.forEach((err) => iterateValidationError([err], errMsgs));
  });
  return errMsgs;
}
