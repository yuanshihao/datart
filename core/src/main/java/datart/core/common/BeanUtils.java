/*
 * Datart
 * <p>
 * Copyright 2021
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package datart.core.common;

import org.springframework.util.CollectionUtils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidationException;
import javax.validation.ValidatorFactory;
import java.util.Set;
import java.util.StringJoiner;

public class BeanUtils {

    private static final ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();

    public static void requireNotNull(Object obj, String... fields) {
        for (String field : fields) {
            Object fieldValue = ReflectUtils.getFieldValue(obj, field);
            if (fieldValue == null) {
                throw new RuntimeException("field " + field + " can not be null");
            }
        }
    }

    public static void validate(Object obj, Class<?>... groups) {
        Set<ConstraintViolation<Object>> validate = validatorFactory.getValidator().validate(obj, groups);
        if (!CollectionUtils.isEmpty(validate)) {
            StringJoiner message = new StringJoiner(",");
            for (ConstraintViolation<Object> v : validate) {
                message.add(v.getPropertyPath() + ":" + v.getMessage());
            }
            throw new ValidationException(message.toString());
        }
    }

}
