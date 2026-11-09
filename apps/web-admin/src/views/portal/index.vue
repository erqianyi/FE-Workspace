<script lang="ts" setup>
import { computed, ref } from 'vue';

import { IconifyIcon, LogOut } from '@vben/icons';
import { UserDropdown } from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { $t } from '#/locales';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Portal' });

const userStore = useUserStore();
const authStore = useAuthStore();

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

const portalMenus = computed(() => [
  {
    handler: handleLogout,
    icon: LogOut,
    text: $t('common.logout'),
  },
]);

const banners = [
  {
    background:
      'linear-gradient(120deg, hsl(214 100% 46% / 0.18), hsl(188 94% 43% / 0.08))',
    description: '统一入口、统一数据、统一权限，帮助你更快完成日常运营与协作。',
    icon: 'lucide:layout-dashboard',
    tag: '产品升级',
    title: 'Web Admin 数据工作台全面焕新',
  },
  {
    background:
      'linear-gradient(120deg, hsl(164 72% 40% / 0.15), hsl(214 90% 49% / 0.08))',
    description: '围绕应用集成、数据治理与权限建模的线下活动现已开放报名。',
    icon: 'lucide:users',
    tag: '活动报名',
    title: '开发者成长计划 · 秋季批次开放',
  },
  {
    background:
      'linear-gradient(120deg, hsl(42 92% 58% / 0.14), hsl(14 78% 56% / 0.07))',
    description: '新增权限配置示例、低代码表单指南与常见问题排查清单。',
    icon: 'lucide:book-open',
    tag: '使用指南',
    title: '新版本用户手册与最佳实践上线',
  },
];

const quickServices = [
  {
    description: '查看经营概览、趋势分析与关键指标。',
    icon: 'lucide:area-chart',
    title: '数据看板',
  },
  {
    description: '处理待办事项、审批任务与协作工作流。',
    icon: 'lucide:kanban-square',
    title: '协作工作台',
  },
  {
    description: '管理账号、角色、权限与安全设置。',
    icon: 'lucide:shield-check',
    title: '用户与权限',
  },
  {
    description: '接收系统提醒、业务通知与任务更新。',
    icon: 'lucide:bell-ring',
    title: '消息中心',
  },
  {
    description: '连接第三方应用，管理集成凭据与回调地址。',
    icon: 'lucide:plug-zap',
    title: '应用集成',
  },
  {
    description: '快速查阅功能说明、上手步骤与排查手册。',
    icon: 'lucide:book-open',
    title: '帮助与文档',
  },
];

const manualEntries = [
  {
    description: '了解平台结构、登录方式与核心功能入口。',
    icon: 'lucide:rocket',
    title: '快速上手',
  },
  {
    description: '按业务角色梳理常用操作与推荐配置。',
    icon: 'lucide:list-checks',
    title: '功能指南',
  },
  {
    description: '查看权限、登录、数据同步等常见问题。',
    icon: 'lucide:circle-help',
    title: '常见问题',
  },
];

const newsItems = [
  {
    date: '2026-11-02',
    summary: '新增数据源连接模板，支持一键创建常用数据库连接。',
    title: '数据集成能力更新',
  },
  {
    date: '2026-10-26',
    summary: '工作台支持按角色配置默认视图和快捷入口。',
    title: '协作工作台体验优化',
  },
  {
    date: '2026-10-18',
    summary: '权限中心支持批量导入角色，并增强变更记录追踪。',
    title: '用户与权限模块升级',
  },
  {
    date: '2026-10-09',
    summary: '系统设置提供更清晰的资源用量和关键告警信息。',
    title: '平台监控面板上线',
  },
];

const qrCodes = [
  { label: 'App 下载', seed: 7 },
  { label: '小程序', seed: 13 },
];

const activeBanner = ref(0);

function getQrCells(seed: number) {
  return Array.from({ length: 289 }, (_, index) => {
    const x = index % 17;
    const y = Math.floor(index / 17);
    const isFinder = (x < 6 && y < 6) || (x > 10 && y < 6) || (x < 6 && y > 10);

    if (isFinder) {
      let fx = x;
      let fy = y;
      if (x > 10 && y < 6) {
        fx = x - 11;
      } else if (x < 6 && y > 10) {
        fy = y - 11;
      }

      const isBorder = fx === 0 || fy === 0 || fx === 5 || fy === 5;
      const isCenter = fx >= 2 && fx <= 3 && fy >= 2 && fy <= 3;
      return isBorder || isCenter;
    }

    const isQuiet = x === 0 || y === 0 || x === 16 || y === 16;
    return isQuiet
      ? false
      : (x * (seed + 2) + y * (seed + 5) + ((x * y + seed) % 4)) % 7 < 3;
  });
}

function nextBanner() {
  activeBanner.value = (activeBanner.value + 1) % banners.length;
}

function prevBanner() {
  activeBanner.value =
    (activeBanner.value - 1 + banners.length) % banners.length;
}
</script>

<template>
  <div class="min-h-dvh bg-background text-foreground">
    <a
      class="absolute left-4 top-4 z-50 -translate-y-16 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      href="#main-content"
    >
      跳到主要内容
    </a>

    <header
      class="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur"
    >
      <div
        class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        <RouterLink
          class="flex items-center gap-2 rounded-md font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          to="/"
        >
          <span
            class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
          >
            <IconifyIcon aria-hidden="true" class="size-4" icon="lucide:zap" />
          </span>
          <span class="text-base">Web Admin</span>
        </RouterLink>

        <div class="flex items-center gap-3">
          <RouterLink
            class="rounded-md text-sm font-medium text-primary transition hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            to="/dashboard"
          >
            {{ $t('page.portal.dashboard') }}
          </RouterLink>
          <UserDropdown
            :avatar="avatar"
            :menus="portalMenus"
            :text="userStore.userInfo?.realName"
            @logout="handleLogout"
          />
        </div>
      </div>
    </header>

    <section
      aria-label="精选内容轮播"
      aria-roledescription="carousel"
      class="relative overflow-hidden"
    >
      <div class="relative min-h-[420px] lg:min-h-[460px]">
        <div
          v-for="(banner, index) in banners"
          :key="banner.title"
          :class="
            index === activeBanner
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          "
          :style="{ backgroundImage: banner.background }"
          class="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        >
          <div
            class="mx-auto grid min-h-[420px] max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:min-h-[460px] lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8 lg:py-16"
          >
            <div class="flex flex-col justify-center gap-5">
              <span
                class="inline-flex w-fit items-center gap-2 rounded-full bg-card/70 px-3 py-1 text-xs font-medium text-primary shadow-sm"
              >
                {{ banner.tag }}
              </span>
              <h1
                class="max-w-3xl text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl"
              >
                {{ banner.title }}
              </h1>
              <p class="max-w-2xl text-base leading-7 text-muted-foreground">
                {{ banner.description }}
              </p>
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  立即查看
                  <IconifyIcon
                    aria-hidden="true"
                    class="size-4"
                    icon="lucide:arrow-right"
                  />
                </span>
              </div>
            </div>

            <div class="relative hidden items-center lg:flex">
              <div
                class="relative w-full rounded-2xl bg-card/75 p-5 shadow-sm backdrop-blur"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-foreground">
                    运行概览
                  </span>
                  <IconifyIcon
                    aria-hidden="true"
                    class="size-4 text-primary"
                    :icon="banner.icon"
                  />
                </div>
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <div class="rounded-lg bg-card p-3 shadow-sm">
                    <p class="text-xs text-muted-foreground">在线用户</p>
                    <p class="mt-1 text-xl font-semibold">1,286</p>
                  </div>
                  <div class="rounded-lg bg-card p-3 shadow-sm">
                    <p class="text-xs text-muted-foreground">任务完成率</p>
                    <p class="mt-1 text-xl font-semibold">98.2%</p>
                  </div>
                </div>
                <div class="mt-4 h-28 rounded-lg bg-card p-3 shadow-sm">
                  <div class="flex h-full items-end gap-2">
                    <span class="h-2/5 w-full rounded-sm bg-primary/70"></span>
                    <span class="h-3/5 w-full rounded-sm bg-primary/70"></span>
                    <span class="h-1/2 w-full rounded-sm bg-primary/70"></span>
                    <span class="h-4/5 w-full rounded-sm bg-primary"></span>
                    <span class="h-2/3 w-full rounded-sm bg-primary/70"></span>
                    <span class="h-full w-full rounded-sm bg-primary"></span>
                  </div>
                </div>
                <div class="mt-4 space-y-2">
                  <div class="h-2 rounded-full bg-muted"></div>
                  <div class="h-2 rounded-full bg-muted/80"></div>
                  <div class="h-2 rounded-full bg-muted/60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-0 z-10">
        <div
          class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8"
        >
          <button
            aria-label="上一条"
            class="grid size-9 place-items-center rounded-full bg-card text-foreground shadow-sm transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
            @click="prevBanner"
          >
            <IconifyIcon
              aria-hidden="true"
              class="size-4"
              icon="lucide:chevron-left"
            />
          </button>

          <div class="flex items-center gap-2">
            <button
              v-for="(banner, index) in banners"
              :key="`indicator-${banner.title}`"
              :aria-current="index === activeBanner ? 'true' : undefined"
              :aria-label="`查看第 ${index + 1} 条内容`"
              :class="index === activeBanner ? 'bg-primary' : 'bg-muted'"
              class="size-2 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              type="button"
              @click="activeBanner = index"
            ></button>
          </div>

          <button
            aria-label="下一条"
            class="grid size-9 place-items-center rounded-full bg-card text-foreground shadow-sm transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
            @click="nextBanner"
          >
            <IconifyIcon
              aria-hidden="true"
              class="size-4"
              icon="lucide:chevron-right"
            />
          </button>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="main-content">
      <section aria-labelledby="services-title" class="py-14 md:py-16">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-semibold md:text-3xl" id="services-title">
            {{ $t('page.portal.services') }}
          </h2>
          <p class="mt-3 text-sm text-muted-foreground">
            常用服务集中在一个入口，按业务场景快速跳转。
          </p>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="service in quickServices"
            :key="service.title"
            class="group rounded-xl bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"
            >
              <IconifyIcon
                aria-hidden="true"
                class="size-5"
                :icon="service.icon"
              />
            </div>
            <h3 class="mt-4 text-base font-semibold">{{ service.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              {{ service.description }}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="events-title"
        class="scroll-mt-24 py-14 md:py-16"
        id="events"
      >
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-semibold md:text-3xl" id="events-title">
            {{ $t('page.portal.events') }}
          </h2>
          <p class="mt-3 text-sm text-muted-foreground">
            关注平台升级、培训活动与开发者共创机会。
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <article
            class="rounded-xl bg-card p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span class="text-xs font-medium text-primary">线下活动</span>
            <h3 class="mt-3 text-lg font-semibold">平台架构开放日</h3>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              分享权限中心、数据集成与应用集成的落地实践。
            </p>
            <p class="mt-4 text-xs text-muted-foreground">2026-11-20 · 上海</p>
          </article>
          <article
            class="rounded-xl bg-card p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span class="text-xs font-medium text-primary">在线直播</span>
            <h3 class="mt-3 text-lg font-semibold">低代码表单实战</h3>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              从字段建模到校验规则，演示复杂表单的最佳配置方式。
            </p>
            <p class="mt-4 text-xs text-muted-foreground">2026-11-28 · 线上</p>
          </article>
          <article
            class="rounded-xl bg-card p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span class="text-xs font-medium text-primary">共创计划</span>
            <h3 class="mt-3 text-lg font-semibold">核心能力体验官招募</h3>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              邀请业务团队参与新版工作台与权限建模共创。
            </p>
            <p class="mt-4 text-xs text-muted-foreground">长期开放</p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="news-title"
        class="scroll-mt-24 py-14 md:py-16"
        id="news"
      >
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-semibold md:text-3xl" id="news-title">
            {{ $t('page.portal.news') }}
          </h2>
          <p class="mt-3 text-sm text-muted-foreground">
            了解平台更新、能力发布与重要提醒。
          </p>
        </div>

        <div class="mt-8 overflow-hidden rounded-xl bg-card shadow-sm">
          <ul class="divide-y divide-border">
            <li
              v-for="news in newsItems"
              :key="news.title"
              class="flex flex-col gap-2 p-5 transition hover:bg-accent md:flex-row md:items-center md:justify-between"
            >
              <div class="min-w-0">
                <h3 class="text-base font-semibold">{{ news.title }}</h3>
                <p class="mt-1 text-sm leading-6 text-muted-foreground">
                  {{ news.summary }}
                </p>
              </div>
              <span class="shrink-0 text-sm text-muted-foreground">
                {{ news.date }}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="about-title"
        class="scroll-mt-24 py-14 md:py-16"
        id="about"
      >
        <div class="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 class="text-2xl font-semibold md:text-3xl" id="about-title">
              {{ $t('page.portal.about') }}
            </h2>
            <p class="mt-4 text-base leading-7 text-muted-foreground">
              Web Admin
              是面向企业内部运营的统一管理平台，聚焦数据可视化、协作流程、权限治理与应用集成，让团队在同一个门户完成日常工作。
            </p>
            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div
                class="rounded-xl bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <p class="text-xl font-semibold">统一入口</p>
                <p class="mt-2 text-sm text-muted-foreground">
                  业务系统集中管理
                </p>
              </div>
              <div
                class="rounded-xl bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <p class="text-xl font-semibold">权限可控</p>
                <p class="mt-2 text-sm text-muted-foreground">
                  角色与资源精细配置
                </p>
              </div>
              <div
                class="rounded-xl bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <p class="text-xl font-semibold">数据驱动</p>
                <p class="mt-2 text-sm text-muted-foreground">
                  关键指标实时呈现
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-xl bg-card p-6 shadow-sm">
            <h3 class="text-lg font-semibold">平台能力</h3>
            <ul class="mt-4 space-y-4">
              <li class="flex gap-3">
                <IconifyIcon
                  aria-hidden="true"
                  class="mt-1 size-4 text-primary"
                  icon="lucide:check"
                />
                <div>
                  <p class="font-medium">多维度数据看板</p>
                  <p class="mt-1 text-sm text-muted-foreground">
                    支持经营、任务、用户与集成服务的关键指标跟踪。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <IconifyIcon
                  aria-hidden="true"
                  class="mt-1 size-4 text-primary"
                  icon="lucide:check"
                />
                <div>
                  <p class="font-medium">灵活权限治理</p>
                  <p class="mt-1 text-sm text-muted-foreground">
                    通过角色、菜单与操作权限控制业务边界。
                  </p>
                </div>
              </li>
              <li class="flex gap-3">
                <IconifyIcon
                  aria-hidden="true"
                  class="mt-1 size-4 text-primary"
                  icon="lucide:check"
                />
                <div>
                  <p class="font-medium">协同工作流</p>
                  <p class="mt-1 text-sm text-muted-foreground">
                    审批、待办与消息提醒串联日常工作。
                  </p>
                </div>
              </li>
            </ul>
            <span
              class="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              {{ $t('page.portal.dashboard') }}
            </span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="manual-title"
        class="scroll-mt-24 py-14 md:py-16"
        id="manual"
      >
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-semibold md:text-3xl" id="manual-title">
            {{ $t('page.portal.manual') }}
          </h2>
          <p class="mt-3 text-sm text-muted-foreground">
            按角色和场景查阅平台说明，降低上手成本。
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <article
            v-for="entry in manualEntries"
            :key="entry.title"
            class="rounded-xl bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              class="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"
            >
              <IconifyIcon
                aria-hidden="true"
                class="size-5"
                :icon="entry.icon"
              />
            </div>
            <h3 class="mt-4 text-base font-semibold">{{ entry.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              {{ entry.description }}
            </p>
          </article>
        </div>
      </section>
    </main>

    <footer class="border-t border-border bg-card">
      <div
        class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-2">
            <span
              class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
            >
              <IconifyIcon
                aria-hidden="true"
                class="size-4"
                icon="lucide:zap"
              />
            </span>
            <span class="font-semibold">Web Admin</span>
          </div>
          <p class="mt-4 text-sm leading-6 text-muted-foreground">
            面向企业内部运营的统一门户与管理平台。
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold">产品</h3>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <RouterLink
                class="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                to="/dashboard"
              >
                工作台
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                to="/dashboard/analytics"
              >
                数据看板
              </RouterLink>
            </li>
            <li>
              <a
                class="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                href="#services"
              >
                服务入口
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold">支持</h3>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                class="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                href="#manual"
              >
                用户手册
              </a>
            </li>
            <li>
              <a
                class="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                href="#about"
              >
                关于平台
              </a>
            </li>
            <li>
              <a
                class="transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                href="#news"
              >
                新闻动态
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold">联系我们</h3>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>support@example.com</li>
            <li>400-000-0000</li>
            <li>工作日 09:00 - 18:00</li>
          </ul>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-8">
        <div
          class="flex flex-col gap-6 rounded-xl bg-muted/25 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-sm">
            <h3 class="text-base font-semibold">扫码获取客户端</h3>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              扫码下载 App 或进入小程序，随时查看数据与处理待办。
            </p>
          </div>

          <div class="flex flex-wrap gap-4">
            <div
              v-for="code in qrCodes"
              :key="code.label"
              class="rounded-xl bg-card p-3 text-center shadow-sm"
            >
              <div
                class="mx-auto grid size-24 place-items-center overflow-hidden rounded-lg bg-white p-2"
              >
                <div
                  class="grid size-full gap-px"
                  style="grid-template-columns: repeat(17, minmax(0, 1fr))"
                >
                  <span
                    v-for="(cell, cellIndex) in getQrCells(code.seed)"
                    :key="cellIndex"
                    :class="cell ? 'bg-slate-900' : 'bg-transparent'"
                    class="aspect-square"
                  ></span>
                </div>
              </div>
              <p class="mt-2 text-sm font-medium text-foreground">
                {{ code.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border-t border-border px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8"
      >
        <div class="mx-auto max-w-7xl">Copyright © 2026 Web Admin Portal</div>
      </div>
    </footer>
  </div>
</template>
