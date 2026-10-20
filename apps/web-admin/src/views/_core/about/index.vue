<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { VBEN_GITHUB_URL } from '@vben/constants';

defineOptions({ name: 'About' });
withDefaults(defineProps<Props>(), {
  description:
    '是一个现代化开箱即用的中后台解决方案，采用最新的技术栈，包括 Vue 3.0、Vite、TailwindCSS 和 TypeScript 等前沿技术，代码规范严谨，提供丰富的配置选项，旨在为中大型项目的开发提供现成的开箱即用解决方案及丰富的示例，同时，它也是学习和深入前端技术的一个极佳示例。',
  name: 'Vben Admin',
  title: '关于项目',
});
interface AboutProps {
  description?: string;
  name?: string;
  title?: string;
}
interface Props extends AboutProps {}
</script>

<template>
  <Page :title="title">
    <template #description>
      <p class="mt-3 text-sm/6 text-foreground">
        本项目基于Vben
        Admin精简变形而得。旨在为企业级项目提供一种工程资源组织方案。
      </p>
      <p class="mt-3 text-sm/6 text-foreground">
        <a :href="VBEN_GITHUB_URL" class="vben-link" target="_blank">
          Vben Admin
        </a>
        {{ description }}
      </p>
    </template>
  </Page>
</template>
