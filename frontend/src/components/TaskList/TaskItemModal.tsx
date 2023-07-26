// src/components/TaskItemModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

interface TaskItemModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (task: any) => void;
  onView: () => void;
  onUpdate: (task: any) => void;
  task?: any;
  isView?: boolean;
}

const TaskItemModal: React.FC<TaskItemModalProps> = ({
  visible,
  onCancel,
  onSave,
  onView,
  onUpdate,
  task,
  isView,
}) => {
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if (task) {
      form.setFieldsValue(task);
      if (!isView) setIsUpdateMode(true);
      else setIsViewMode(true);
    } else {
      form.resetFields();
      setIsUpdateMode(false);
      setIsViewMode(false);
    }
  }, [task, form, isView]);

  const handleOk = () => {
    try {
      if (isViewMode) {
        onView();
      } else {
        form.validateFields().then((values) => {
          if (isUpdateMode) onUpdate({ ...values, taskId: task.taskId });
          else onSave(values);
          form.resetFields();
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      visible={visible}
      title={
        isUpdateMode ? "Update Task" : isViewMode ? "View task" : "Create Task"
      }
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          name="desc"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea disabled={isViewMode} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select disabled={isViewMode} defaultValue={"todo"}>
            <Select.Option value="todo">To Do</Select.Option>
            <Select.Option value="inprogress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskItemModal;
