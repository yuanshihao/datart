import { InfoCircleOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import {
  LINE_HEIGHT_BODY,
  LINE_HEIGHT_HEADING,
  SPACE_MD,
  SPACE_TIMES,
  SPACE_XS,
} from 'styles/StyleConstants';
import { selectCurrentEditingViewAttr } from '../../slice/selectors';

export const Error = memo(() => {
  const error = useSelector(state =>
    selectCurrentEditingViewAttr(state, { name: 'error' }),
  ) as string;

  return (
    <Wrapper>
      <h3>
        <InfoCircleOutlined className="icon" />
        执行错误
      </h3>
      <p>{error}</p>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${SPACE_MD};
  overflow-y: auto;
  color: ${p => p.theme.error};
  background-color: ${p => p.theme.bodyBackground};

  .icon {
    margin-right: ${SPACE_XS};
  }

  h3 {
    line-height: ${LINE_HEIGHT_HEADING};
  }

  p {
    padding: 0 ${SPACE_TIMES(6)};
    line-height: ${LINE_HEIGHT_BODY};
  }
`;
