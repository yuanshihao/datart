import { Card } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResourceTypes, SubjectTypes, Viewpoints } from '../constants';
import {
  selectMemberListLoading,
  selectMembers,
  selectPermissionLoading,
  selectRoleListLoading,
  selectRoles,
} from '../slice/selectors';
import { getDataSource, getResourcePermission } from '../slice/thunks';
import { getInverseViewpoints } from '../utils';
import { PermissionForm } from './PermissionForm';

interface SubjectPermissionSettingProps {
  viewpoint: Viewpoints;
  viewpointType: ResourceTypes | SubjectTypes;
  viewpointId: string;
  orgId: string;
}

export const SubjectPermissionSetting = memo(
  ({
    viewpoint,
    viewpointType,
    viewpointId,
    orgId,
  }: SubjectPermissionSettingProps) => {
    const [tabActiveKey, setTabActiveKey] = useState<SubjectTypes>(
      SubjectTypes.Role,
    );
    const dispatch = useDispatch();
    const roles = useSelector(selectRoles);
    const members = useSelector(selectMembers);
    const roleListLoading = useSelector(selectRoleListLoading);
    const memberListLoading = useSelector(selectMemberListLoading);
    const permissionLoading = useSelector(state =>
      selectPermissionLoading(state, { viewpoint }),
    );

    useEffect(() => {
      if (viewpointType && viewpointId) {
        dispatch(
          getResourcePermission({
            orgId: orgId,
            type: viewpointType as ResourceTypes,
            id: viewpointId,
          }),
        );
      }
    }, [dispatch, orgId, viewpointType, viewpointId]);

    useEffect(() => {
      dispatch(
        getDataSource({
          viewpoint: getInverseViewpoints(viewpoint),
          dataSourceType: tabActiveKey,
        }),
      );
    }, [dispatch, tabActiveKey, viewpoint, orgId]);

    const tabChange = useCallback(activeKey => {
      setTabActiveKey(activeKey);
    }, []);

    const tabSource = useMemo(
      () => [
        {
          type: SubjectTypes.Role,
          label: '角色',
          dataSource: roles,
          loading: roleListLoading,
        },
        {
          type: SubjectTypes.UserRole,
          label: '成员',
          dataSource: members,
          loading: memberListLoading,
        },
      ],
      [roles, members, roleListLoading, memberListLoading],
    );

    const tabList = useMemo(
      () => tabSource.map(({ type, label }) => ({ key: type, tab: label })),
      [tabSource],
    );

    return (
      <Card
        tabList={tabList}
        defaultActiveTabKey={tabActiveKey}
        tabProps={{ size: 'middle' }}
        onTabChange={tabChange}
      >
        {tabSource.map(({ type, dataSource, loading }) => (
          <PermissionForm
            key={type}
            selected={type === tabActiveKey}
            viewpoint={viewpoint}
            viewpointType={viewpointType}
            viewpointId={viewpointId}
            orgId={orgId}
            dataSource={dataSource}
            dataSourceType={type}
            permissionLoading={permissionLoading}
            resourceLoading={loading}
          />
        ))}
      </Card>
    );
  },
);
