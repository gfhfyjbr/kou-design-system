import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AuroraBackground,
  Button,
  Card,
  CardHeader,
  CardTitle,
  DataTable,
  DefinitionList,
  Field,
  FormRow,
  Inline,
  Input,
  KeyValue,
  LineDot,
  MetricCard,
  ModeChip,
  OverviewGrid,
  Pad,
  ProviderDot,
  ResponsiveGrid,
  SideStack,
  SignalPost,
  Stack,
  StatusBadge,
  TableCell,
  TableHeadCell,
  TableScroll,
  Toolbar,
  Spacer,
} from '../src'

const meta = {
  title: 'Primitives/Granular UI Kit',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ContainersAndCards: Story = {
  render: () => (
    <Stack className="sb-kou-wide">
      <Toolbar>
        <span className="mut">Composable shell controls</span>
        <Spacer />
        <Button>SECONDARY</Button>
        <Button variant="primary">PRIMARY</Button>
      </Toolbar>
      <OverviewGrid>
        <Card>
          <CardHeader><CardTitle kana="容器">CONTAINER</CardTitle></CardHeader>
          <Pad>
            <FormRow>
              <Field label="BASE URL"><Input defaultValue="http://127.0.0.1:1455/v1" /></Field>
              <Field label="MODEL"><Input defaultValue="codex/gpt-5-codex" /></Field>
              <Button variant="primary">SAVE</Button>
            </FormRow>
            <Inline>
              <ModeChip mode="live" />
              <ModeChip mode="demo" />
              <StatusBadge tone="on">IN SERVICE</StatusBadge>
              <StatusBadge tone="warn">DELAYED</StatusBadge>
              <StatusBadge tone="off">CLOSED</StatusBadge>
            </Inline>
          </Pad>
        </Card>
        <SideStack>
          <MetricCard label="LINES" kana="路線" value={12} accent sparkSeed="granular:lines" />
          <MetricCard label="REQUESTS" kana="要求" value="18 234" sparkSeed="granular:requests" />
        </SideStack>
      </OverviewGrid>
    </Stack>
  ),
}

export const StatusAndTables: Story = {
  render: () => (
    <ResponsiveGrid className="sb-kou-wide" minColumnWidth="360px">
      <Card>
        <CardHeader><CardTitle kana="状態">STATUS PARTS</CardTitle></CardHeader>
        <Pad>
          <Inline>
            <ProviderDot color="var(--codex)" />
            <span>Codex</span>
            <SignalPost active="ok" />
          </Inline>
          <Inline>
            <LineDot color="var(--claude)" />
            <span>Claude</span>
            <SignalPost active="warn" />
          </Inline>
          <DefinitionList
            items={[
              { label: 'PREFIX', value: 'codex' },
              { label: 'PRIORITY', value: 20 },
              { label: 'SIGNAL', value: 'clear' },
            ]}
          />
          <KeyValue label="SESSION">authenticated</KeyValue>
        </Pad>
      </Card>
      <Card>
        <CardHeader><CardTitle kana="表">DATA TABLE</CardTitle></CardHeader>
        <TableScroll>
          <DataTable>
            <tbody>
              <tr>
                <TableHeadCell>STATUS</TableHeadCell>
                <TableHeadCell>MODEL</TableHeadCell>
                <TableHeadCell align="right">LATENCY</TableHeadCell>
              </tr>
              <tr>
                <TableCell><span className="lg-st ok">200</span></TableCell>
                <TableCell className="mono">gpt-5-codex</TableCell>
                <TableCell className="mono mut" align="right">420ms</TableCell>
              </tr>
              <tr>
                <TableCell><span className="lg-st warn">429</span></TableCell>
                <TableCell className="mono">claude-sonnet-4-5</TableCell>
                <TableCell className="mono mut" align="right">retrying</TableCell>
              </tr>
            </tbody>
          </DataTable>
        </TableScroll>
      </Card>
    </ResponsiveGrid>
  ),
}

export const FxBackgroundPiece: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <>
      <AuroraBackground />
      <Card className="sb-kou-narrow">
        <CardHeader><CardTitle kana="光">AURORA BACKGROUND</CardTitle></CardHeader>
        <Pad>
          <p className="mut">This story mounts the exported background layer without the full cursor/canvas hook.</p>
        </Pad>
      </Card>
    </>
  ),
}
