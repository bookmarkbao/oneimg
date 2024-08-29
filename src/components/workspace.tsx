import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import EditorForm from '@/components/editor/editor-form'
import ContentList from '@/components/content-list'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Content, EditorStatus } from '@/types/type'

interface WorkspaceProps {
  contents: Content[];
  onContentSubmit: (content: Content) => Promise<void>;
  onContentDelete: (content: Content) => Promise<void>;
}

export function Workspace(props: WorkspaceProps) {
  const { contents, onContentSubmit, onContentDelete } = props
  const [editorStatus, setEditorStatus] = useState<EditorStatus>('close')

  return (
    <div className="w-[800px] flex flex-col p-8">
      <ContentList
        editorEditStatus="edit"
        editorStatus={editorStatus}
        contents={contents}
        onEditorStatusChange={(status: EditorStatus) => setEditorStatus(status)}
        onContentDelete={onContentDelete}
        onSubmit={onContentSubmit}
      />
      <EditorForm
        onSubmit={onContentSubmit}
        className={editorStatus === 'add' ? '' : 'hidden'}
        hideEditor={() => setEditorStatus('close')}
      />
      <Button className={cn('w-full', editorStatus === 'add' ? 'hidden' : '')} onClick={() => setEditorStatus('add')}>
        <PlusIcon className="w-4 h-4 mr-2" />
        添加标题
      </Button>
    </div>
  )
}