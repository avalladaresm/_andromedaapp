// import React, {useState, useEffect} from 'react';
// import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Divider, Dropdown, Menu, message, Tooltip, TimePicker, Cascader, InputNumber } from 'antd';
// import moment from 'moment';
// import { UsersListItem, UsersListItemForUpdate } from '../data';
// // import { queryGetCitiesByStateId, queryGetStatesByCountryId } from '../../../services/users';
// const { Option } = Select;

// export interface FormValueType extends Partial<UsersListItem> {
//   target?: string;
//   template?: string;
//   type?: string;
//   time?: string;
//   frequency?: string;
// }

// export interface UpdateFormProps {
//   onCancel: (flag?: boolean, formVals?: UsersListItemForUpdate) => void;
//   onUpdate: (values: UsersListItemForUpdate) => void;
//   visible: boolean;
//   loading: boolean;
//   values: Partial<UsersListItemForUpdate>;
// }

// export interface UpdateFormState {
//   formVals: FormValueType;
//   currentStep: number;
// }

// const formLayout = {
//   labelCol: { span: 7 },
//   wrapperCol: { span: 13 },
// };

// const UpdateForm = ({ visible, onUpdate, onCancel, loading, values }) => {
//   //const [formVals, setFormVals] = useState<UsersListItemForUpdate>({});

//   const [form] = Form.useForm();
//   const [stateSelectDisabled, handleStateSelectDisabled] = useState(true);
//   const [citySelectDisabled, handleCitySelectDisabled] = useState(true);
//   const [statesForSelectedCountry, handleStatesForSelectedCountry] = useState([]);
//   const [citiesForSelectedState, handleCitiesForSelectedState] = useState([]);

//   useEffect(() => {
//     async function checkExistingCityState () {
//       if(values.state != null || values.state != undefined) {
//         handleStateSelectDisabled(false);
//         const d = await queryGetStatesByCountryId(values.countryId);
//         handleStatesForSelectedCountry(d.data)
//       }
//       if(values.city != null || values.city != undefined) {
//         handleCitySelectDisabled(false);
//         const d = await queryGetCitiesByStateId(values.stateId);
//         handleCitiesForSelectedState(d.data)
//       }
//     }
//     checkExistingCityState()
//   }, [])

//   const onCountryChange = async (value) => {
//     handleStateSelectDisabled(false);
//     const d = await queryGetStatesByCountryId(value);
//     handleStatesForSelectedCountry(d.data)
//   }

//   const onStateChange = async (value) => {
//     handleCitySelectDisabled(false);
//     const d = await queryGetCitiesByStateId(value);
//     handleCitiesForSelectedState(d.data)
//     form.setFieldsValue({city: ''})
//   }

//   return (
//     <Modal
//       width={640}
//       bodyStyle={{ padding: '32px 40px 48px' }}
//       destroyOnClose
//       title="Edit User"
//       visible={visible}
//       onCancel={onCancel}
//       footer={[
//         <Button key="cancel" onClick={onCancel}>
//           Cancel
//         </Button>,
//         <Button key="submit" type="primary" loading={loading} onClick={() => {
//           form
//             .validateFields()
//             .then(items => {
//               items.dob = items.dob.format('YYYY-MM-DD')
//               items['cityId'] = items.city === values.city ? values.cityId : items.city
//               items['stateId'] = items.state === values.state ? values.stateId : items.state
//               items['countryId'] = items.country === values.country ? values.countryId : items.country
//               delete(items.city)
//               delete(items.state)
//               delete(items.country)
//               onUpdate(items);
//             })
//             .catch(info => {
//               console.log('Validate Failed:', info);
//             });
//         }}>
//           Update
//         </Button>
//       ]}
//     >
//       <Form
//         {...formLayout}
//         form={form}
//         initialValues={{
//           firstName: values.firstName,
//           middleName: values.middleName,
//           lastName: values.lastName,
//           gender: values.gender,
//           email: values.email,
//           cellphone: values.cellphone,
//           lastLogin: values.lastLogin,
//           address: values.address,
//           cityId: values.cityId,
//           stateId: values.stateId,
//           countryId: values.countryId,
//           city: values.city,
//           state: values.state,
//           country: values.country,
//         }}
//       >
//         <Form.Item name="firstName" label="First name">
//           <Input id="firstName" autoComplete="off" />
//         </Form.Item>
//         <Form.Item name="middleName" label="Middle name">
//           <Input id="middleName" autoComplete="off" />
//         </Form.Item>
//         <Form.Item name="lastName" label="Last name" rules={[{
//           required: true,
//           message: 'Please input your last name!',
//         }]}>
//           <Input id="lastName" autoComplete="off" />
//         </Form.Item>
//         <Form.Item name="gender" label="Gender" rules={[{
//           required: true,
//           message: 'Please input your gender!',
//         }]}>
//           <Select dropdownMatchSelectWidth={false}>
//             <Option value="Female">Female</Option>
//             <Option value="Male">Male</Option>
//             <Option value="Other">Other</Option>
//           </Select>
//         </Form.Item>
//         <Form.Item initialValue={moment(values.dob, 'YYYY-MM-DD')} name="dob" label="DOB" rules={[{
//           required: true,
//           message: 'Please input your date of birth!',
//         }]}>
//           <DatePicker style={{ width: '100%' }} onChange={(date,dateString) => {return dateString}}/>
//         </Form.Item>
//         <Form.Item name="email" label="Email" rules={[{
//           required: true,
//           message: 'Please input your email!',
//         }]}>
//           <Input id="email" autoComplete="off" />
//         </Form.Item>
//         <Form.Item name="cellphone" label="Cellphone" rules={[{
//           required: true,
//           message: 'Please input your cellphone!',
//         }]}>
//           <Input id="cellphone" autoComplete="off" />
//         </Form.Item>
//         <Form.Item name="address" label="Address">
//           <Input id="address" autoComplete="off" />
//         </Form.Item>
//         <Form.Item name="city" label="City">
//           <Select disabled={citySelectDisabled} dropdownMatchSelectWidth={false}>
//             {citiesForSelectedState && citiesForSelectedState.map((city, i) => (
//               <Option value={city.id} key={i}>{city.name}</Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item name="state" label="State">
//           <Select onChange={onStateChange} disabled={stateSelectDisabled} dropdownMatchSelectWidth={false}>
//             {statesForSelectedCountry && statesForSelectedCountry.map((state, i) => (
//               <Option value={state.id} key={i}>{state.name}</Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item name="country" label="Country">
//           <Select onChange={onCountryChange} dropdownMatchSelectWidth={false}>
//             <Option value="HN">Honduras</Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default UpdateForm;
