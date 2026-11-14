<script lang="ts" setup>
import { Card, Table } from 'antdv-next';

const columns = [
  { title: '订单号', dataIndex: 'id' },
  { title: '客户', dataIndex: 'customer' },
  { title: '状态', dataIndex: 'status' },
  { title: '金额', dataIndex: 'amount' },
];

const dataSource = [
  { id: 'A10001', customer: '示例客户 A', status: '已支付', amount: '¥1,280' },
  { id: 'A10002', customer: '示例客户 B', status: '待发货', amount: '¥860' },
  { id: 'A10003', customer: '示例客户 C', status: '已完成', amount: '¥2,300' },
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
