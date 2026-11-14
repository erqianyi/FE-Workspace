<script lang="ts" setup>
import { Card, Table } from 'antdv-next';

const columns = [
  { title: '运单号', dataIndex: 'id' },
  { title: '路线', dataIndex: 'route' },
  { title: '状态', dataIndex: 'status' },
  { title: '司机', dataIndex: 'driver' },
];

const dataSource = [
  { id: 'TR202611001', route: '上海 - 杭州', status: '运输中', driver: '张强' },
  { id: 'TR202611002', route: '广州 - 深圳', status: '已完成', driver: '李敏' },
  { id: 'TR202611003', route: '北京 - 天津', status: '待调度', driver: '王磊' },
];
</script>

<template>
  <Card :bordered="false">
    <Table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      size="small"
    />
  </Card>
</template>
