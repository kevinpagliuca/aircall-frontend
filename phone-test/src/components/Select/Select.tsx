import { Box, ChevronDownOutlined, DoubleCheckOutlined, Grid, Typography } from '@aircall/tractor';

import * as PrimitiveSelect from '@radix-ui/react-select';
import { useState } from 'react';
import { OptionItemBox } from './Select.styles';

type Props = PrimitiveSelect.SelectProps & {
  options: Array<{ value: any; label: string }>;
  placeholder?: string;
};

const Select = ({
  options,
  name,
  value,
  onValueChange,
  placeholder,
  defaultValue,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === (value || defaultValue));

  return (
    <PrimitiveSelect.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <PrimitiveSelect.Trigger asChild>
        <Grid
          h={48}
          bg="background-02"
          border="1px solid"
          borderColor="neutral-500"
          w="100%"
          borderRadius={8}
          gridTemplateColumns="1fr auto"
          px={3}
          alignItems="center"
          cursor="pointer"
          tabIndex={0}
        >
          <Typography
            variant={selectedOption ? 'body' : 'body2'}
            color={selectedOption ? 'text-core' : 'neutral-400'}
          >
            {selectedOption?.label || placeholder}
          </Typography>
          <ChevronDownOutlined />
        </Grid>
      </PrimitiveSelect.Trigger>

      <PrimitiveSelect.Portal>
        <PrimitiveSelect.Content asChild position="popper" sideOffset={8}>
          <Box
            position="relative"
            zIndex={50}
            maxH={400}
            borderRadius={8}
            overflow="hidden"
            bg="background-02"
            border="1px solid"
            borderColor="neutral-500"
          >
            <PrimitiveSelect.Viewport asChild>
              <Box
                w="100%"
                h="var(--radix-select-trigger-height)"
                minWidth="var(--radix-select-trigger-width)"
              >
                {options.map(option => (
                  <PrimitiveSelect.Item key={option.value} value={option.value} asChild>
                    <OptionItemBox isSelected={option.value === value}>
                      <PrimitiveSelect.ItemText>{option.label}</PrimitiveSelect.ItemText>
                      {option.value === value && <DoubleCheckOutlined color="green-500" />}
                    </OptionItemBox>
                  </PrimitiveSelect.Item>
                ))}
              </Box>
            </PrimitiveSelect.Viewport>
          </Box>
        </PrimitiveSelect.Content>
      </PrimitiveSelect.Portal>
    </PrimitiveSelect.Root>
  );
};

export default Select;
