export type SearchBarProps = {
  shouldNavigate?: boolean;
  editable?: boolean;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
};
