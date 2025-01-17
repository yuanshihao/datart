/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DatePicker } from 'antd';
import { updateBy } from 'app/utils/mutation';
import moment from 'moment';
import { FC, memo, useState } from 'react';
import { PresentControllerFilterProps } from '.';

const RangTimeFilter: FC<PresentControllerFilterProps> = memo(
  ({ condition, onConditionChange }) => {
    const [timeRange, setTimeRange] = useState<string[]>(() => {
      if (Array.isArray(condition?.value)) {
        return condition?.value as string[];
      }
      return [];
    });

    const handleDateChange = (times: any) => {
      const newCondition = updateBy(condition!, draft => {
        draft.value = (times || []).map(d => d.toString());
      });
      onConditionChange(newCondition);
      setTimeRange(newCondition.value as string[]);
    };

    return (
      <DatePicker.RangePicker
        showTime
        value={[moment(timeRange?.[0]), moment(timeRange?.[1])]}
        onChange={handleDateChange}
      />
    );
  },
);

export default RangTimeFilter;
