import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Badge,
  Button,
  Chip,
  Dropdown,
  Empty,
  Field,
  Input,
  Lamp,
  Modal,
  MultiDropdown,
  Panel,
  PanelHeader,
  PanelTitle,
  Spark,
  TextArea,
  TiltCard,
  useToast,
} from '../src'

const modelOptions = [
  { value: 'claude-sonnet-4-5', label: 'claude-sonnet-4-5', hint: 'main' },
  { value: 'gpt-5-codex', label: 'gpt-5-codex', hint: 'codex' },
  { value: 'o4-mini', label: 'o4-mini', hint: 'fast' },
]

function ControlsDemo() {
  const [status, setStatus] = useState('live')
  const [models, setModels] = useState<string[]>(['claude-sonnet-4-5'])
  const [modalOpen, setModalOpen] = useState(false)
  const toast = useToast()

  return (
    <div className="sb-kou-stack sb-kou-wide">
      <Panel>
        <PanelHeader><PanelTitle kana="制御">CONTROLS</PanelTitle></PanelHeader>
        <div className="pad">
          <div className="sb-kou-row">
            <Button>DEFAULT</Button>
            <Button variant="primary" onClick={() => toast('primary action')}>PRIMARY</Button>
            <Button variant="danger" onClick={() => toast('danger action', 'err')}>DANGER</Button>
            <Button tiny onClick={() => setModalOpen(true)}>OPEN MODAL</Button>
          </div>
          <div className="sb-kou-row">
            <Dropdown
              label="STATUS"
              value={status}
              onChange={setStatus}
              options={[
                { value: 'live', label: 'live', hint: 'online' },
                { value: 'demo', label: 'demo', hint: 'seeded' },
                { value: 'hold', label: 'hold', hint: 'paused' },
              ]}
            />
            <MultiDropdown
              label="MODELS"
              values={models}
              onChange={setModels}
              emptyLabel="* all models"
              options={modelOptions}
            />
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="入力">FIELDS</PanelTitle></PanelHeader>
        <div className="form-row">
          <Field label="NAME"><Input placeholder="my-app" /></Field>
          <Field label="TOKEN"><Input placeholder="sk-..." /></Field>
        </div>
        <div className="pad">
          <Field label="JSON"><TextArea className="mono" defaultValue={'{\n  "routing_strategy": "priority"\n}'} /></Field>
        </div>
      </Panel>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="MODAL"
        kana="窓"
        footer={<Button variant="primary" onClick={() => setModalOpen(false)}>DONE</Button>}
      >
        <p className="mut">Liquid glass dialog, scroll lock, escape key, and backdrop close.</p>
      </Modal>
    </div>
  )
}

function DisplayDemo() {
  return (
    <div className="sb-kou-stack sb-kou-wide">
      <Panel>
        <PanelHeader><PanelTitle kana="表示">DISPLAY</PanelTitle></PanelHeader>
        <div className="pad">
          <div className="sb-kou-row">
            <Badge tone="on">IN SERVICE</Badge>
            <Badge tone="warn">DELAYS</Badge>
            <Badge tone="off">CLOSED</Badge>
            <Chip mono>codex</Chip>
            <Chip>路線</Chip>
            <Lamp tone="ok" pulse />
            <Lamp tone="warn" pulse />
            <Lamp tone="err" pulse />
          </div>
        </div>
      </Panel>
      <div className="sb-kou-split">
        <TiltCard className="stat accent">
          <div className="stat-head">
            <span>LINES</span>
            <span className="stat-badge kana">路線</span>
          </div>
          <b className="mono">12</b>
          <Spark seed="storybook:lines" />
        </TiltCard>
        <Panel>
          <Empty kana="待機中">EMPTY STATE</Empty>
        </Panel>
      </div>
    </div>
  )
}

const meta = {
  title: 'Primitives/Components',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Controls: Story = {
  render: () => <ControlsDemo />,
}

export const Display: Story = {
  render: () => <DisplayDemo />,
}
