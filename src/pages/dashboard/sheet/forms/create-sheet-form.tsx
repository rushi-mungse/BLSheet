import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import { useMutation } from "react-query";

import useUserInfo from "../../../../hooks/useUserInfo";
import useErrorHandler from "../../../../hooks/useErrorHandler";

import blSheetService from "../../../../services/bl-sheet-service";

import { BL_SHEET_TYPES } from "../../../../constants";
import { BLSheet, SheetType } from "../../../../types";

interface CreateSheetFormProps {
  refetchBLSheet: () => void;
  onCloseDrawer: () => void;
  clearParams: () => void;
}

const CreateSheetForm = ({
  refetchBLSheet,
  onCloseDrawer,
  clearParams,
}: CreateSheetFormProps) => {
  const { authToken } = useUserInfo();
  const { handleError } = useErrorHandler();
  const [form] = Form.useForm();

  const { isLoading, mutate: createBlSheet } = useMutation({
    mutationKey: ["create-bl-sheet"],
    mutationFn: ({ data }: { data: BLSheet }) =>
      blSheetService().createBlSheet({ data, authToken }),
    onSuccess: () => {
      refetchBLSheet();
      onCloseDrawer();
      form.resetFields();
      clearParams();
    },
    onError: (error) => {
      console.error("ERROR :: create bl sheet ::", error);
      handleError(error);
    },
    retry: false,
  });

  const handleOnChange = () => {
    const { money, tax, type } = form.getFieldsValue();
    const intrest = (money * tax) / 100;
    const calc = money + (type === SheetType.EXPENSE ? intrest : -intrest);
    form.setFieldValue("totalMoney", calc);
  };

  return (
    <div className="bg-turnary p-6 rounded-lg">
      <Form
        form={form}
        initialValues={{ isPaid: false, tax: 0, type: "income", totalMoney: 0 }}
        layout="vertical"
        onFinish={(data: BLSheet) => createBlSheet({ data })}
        onChange={handleOnChange}
      >
        <Form.Item
          name="clientName"
          label={<span className="text-primary font-medium">Client Name</span>}
          rules={[{ required: true, message: "Client Name must be required" }]}
        >
          <Input placeholder="Client Name" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-primary font-medium">Sheet Description</span>
          }
          rules={[{ required: true, message: "Description must be required" }]}
        >
          <Input.TextArea placeholder="Sheet description" />
        </Form.Item>

        <div className="flex items-center space-x-8">
          <Form.Item
            name="money"
            label={<span className="text-primary font-medium">Money</span>}
            rules={[{ required: true, message: "Income must be required" }]}
          >
            <InputNumber
              min={1}
              className="w-full"
              placeholder="Ex.40"
              prefix="₹"
            />
          </Form.Item>

          <Form.Item
            name="tax"
            label={<span className="text-primary font-medium">Tax</span>}
            rules={[{ required: true, message: "Tax must be required" }]}
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Ex.40"
              suffix="%"
            />
          </Form.Item>
        </div>

        <div className="flex items-center space-x-8">
          <Form.Item
            className="w-full"
            name="date"
            label={<span className="text-primary font-medium">Date</span>}
            rules={[{ required: true, message: "Date must be required" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="type"
            label={<span className="text-primary font-medium">Sheet Type</span>}
          >
            <Select
              onChange={handleOnChange}
              options={BL_SHEET_TYPES}
              className="w-full"
            />
          </Form.Item>
        </div>

        <div className="flex items-center space-x-8">
          <Form.Item
            name="totalMoney"
            label={
              <span className="text-primary font-medium">Total Money</span>
            }
          >
            <InputNumber prefix="₹" className="w-full" disabled={true} />
          </Form.Item>

          <Form.Item name="isPaid" className="mb-12">
            <span className="text-primary font-medium pl-2 pr-5">Paid</span>
            <Checkbox
              onChange={(e) => {
                const checked = e.target.checked;
                form.setFieldValue("isPaid", checked);
              }}
            />
          </Form.Item>
        </div>

        <div className="flex items-center justify-end">
          <Button
            htmlType="submit"
            className="px-6 rounded-full ring-0"
            type="primary"
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateSheetForm;
