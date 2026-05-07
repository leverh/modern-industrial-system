import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import type { Column } from './DataTable'
import { Badge } from '../foundations/Badge'


type DeployRow = {
  id: string
  service: string
  version: string
  status: 'deployed' | 'building' | 'failed' | 'degraded'
  region: string
  duration: string
  timestamp: string
}

const STATUS_VARIANT: Record<DeployRow['status'], 'success' | 'accent' | 'error' | 'warning'> = {
  deployed: 'success',
  building: 'accent',
  failed: 'error',
  degraded: 'warning',
}

const COLUMNS: Column<DeployRow>[] = [
  { key: 'service',   header: 'Service',   sortable: true, width: '20%' },
  { key: 'version',   header: 'Version',   mono: true,     width: '10%' },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    width: '14%',
    render: (val) => {
      const v = val as DeployRow['status']
      return <Badge variant={STATUS_VARIANT[v]} dot size="sm">{v}</Badge>
    },
  },
  { key: 'region',    header: 'Region',    sortable: true, mono: true, width: '14%' },
  { key: 'duration',  header: 'Duration',  mono: true,     width: '12%' },
  { key: 'timestamp', header: 'Timestamp', sortable: true, mono: true  },
]

const DATA: DeployRow[] = [
  { id: '1', service: 'api-gateway',    version: 'v2.4.1', status: 'deployed', region: 'eu-west-1', duration: '1m 12s', timestamp: '2026-05-07 09:41' },
  { id: '2', service: 'auth-service',   version: 'v1.9.0', status: 'building', region: 'eu-west-1', duration: '—',      timestamp: '2026-05-07 09:43' },
  { id: '3', service: 'edge-cdn',       version: 'v3.1.0', status: 'deployed', region: 'us-east-1', duration: '0m 48s', timestamp: '2026-05-07 08:55' },
  { id: '4', service: 'billing-worker', version: 'v0.8.3', status: 'failed',   region: 'eu-west-1', duration: '2m 04s', timestamp: '2026-05-07 08:12' },
  { id: '5', service: 'storage-proxy',  version: 'v1.2.1', status: 'degraded', region: 'ap-south-1', duration: '1m 38s', timestamp: '2026-05-06 23:30' },
  { id: '6', service: 'search-index',   version: 'v4.0.0', status: 'deployed', region: 'us-east-1', duration: '3m 21s', timestamp: '2026-05-06 22:10' },
]

//  Meta 

const meta: Meta = {
  title: 'Data & Feedback/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Generic sortable data table. Columns are typed via `Column<T>[]`; sort state is internal. Custom `render` functions on columns accept any ReactNode — use them for badges, icons, or links. `rowKey` should always be provided for stable React keys.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<Meta>

//  Stories 

export const Default: Story = {
  render: () => (
    <DataTable<DeployRow>
      columns={COLUMNS}
      data={DATA}
      rowKey="id"
    />
  ),
  parameters: {
    docs: {
      description: { story: 'Default view with sorting active on all relevant columns. Click a header to sort; click again to reverse; third click clears.' },
    },
  },
}

export const NoFooter: Story = {
  name: 'Without Footer',
  render: () => (
    <DataTable<DeployRow>
      columns={COLUMNS}
      data={DATA}
      rowKey="id"
      showFooter={false}
    />
  ),
}

export const EmptyState: Story = {
  name: 'Empty State',
  render: () => (
    <DataTable<DeployRow>
      columns={COLUMNS}
      data={[]}
      rowKey="id"
      emptyMessage="NO DEPLOYMENTS FOUND"
    />
  ),
  parameters: {
    docs: {
      description: { story: '`emptyMessage` renders when `data` is an empty array. Uppercase mono, centered.' },
    },
  },
}

export const SingleRow: Story = {
  name: 'Single Row',
  render: () => (
    <DataTable<DeployRow>
      columns={COLUMNS}
      data={[DATA[0]]}
      rowKey="id"
    />
  ),
}

export const CustomColumns: Story = {
  name: 'Minimal Columns',
  render: () => (
    <DataTable<DeployRow>
      columns={[
        { key: 'service', header: 'Service', sortable: true },
        { key: 'status',  header: 'Status',  sortable: true, render: (val) => {
          const v = val as DeployRow['status']
          return <Badge variant={STATUS_VARIANT[v]} size="sm">{v}</Badge>
        }},
        { key: 'region',  header: 'Region',  mono: true },
      ]}
      data={DATA}
      rowKey="id"
    />
  ),
  parameters: {
    docs: {
      description: { story: 'Columns are fully composable — pass only what you need. Column order mirrors array order.' },
    },
  },
}

export const ManyRows: Story = {
  name: 'Many Rows',
  render: () => {
    const expanded: DeployRow[] = Array.from({ length: 40 }, (_, i) => ({
      id: String(i),
      service: DATA[i % DATA.length].service,
      version: `v${Math.floor(Math.random() * 5)}.${i % 10}.${i % 4}`,
      status: (['deployed', 'building', 'failed', 'degraded'] as const)[i % 4],
      region: (['eu-west-1', 'us-east-1', 'ap-south-1'] as const)[i % 3],
      duration: `${i % 4}m ${(i * 7) % 60}s`,
      timestamp: `2026-05-07 0${i % 9}:${String((i * 3) % 60).padStart(2, '0')}`,
    }))
    return <DataTable<DeployRow> columns={COLUMNS} data={expanded} rowKey="id" />
  },
  parameters: {
    docs: {
      description: { story: '40 rows — verifies sorting performance and row striping at scale.' },
    },
  },
}