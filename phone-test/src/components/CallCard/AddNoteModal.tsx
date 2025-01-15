import {
  Button,
  Flex,
  Form,
  FormItem,
  Grid,
  Icon,
  Modal,
  Spacer,
  SpinnerOutlined,
  Textarea,
  Typography,
  useToast
} from '@aircall/tractor';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ADD_CALL_NOTE } from '../../gql/mutations';
import { useMutation } from '@apollo/client';

type Props = {
  isOpen: boolean;
  onHide: () => void;
  callId: string;
};

const StyledModalHeader = styled.div`
  margin-left: auto;
  svg {
    color: ${({ theme }) => {
      return theme.colors['text-core'];
    }};
  }
`;

export const AddNoteModal = ({ callId, isOpen, onHide }: Props) => {
  const form = useForm();
  const { showToast, removeToast } = useToast();

  const [addNoteMutation] = useMutation(ADD_CALL_NOTE);

  const onSubmit = form.handleSubmit(async ({ content }) => {
    const ADD_NOTE_REJECTED = 'ADD_NOTE_REJECTED';

    try {
      removeToast(ADD_NOTE_REJECTED);
      await addNoteMutation({
        variables: {
          input: {
            activityId: callId,
            content
          }
        }
      });

      onHide();
      showToast({
        id: ADD_NOTE_REJECTED,
        message: 'The note was saved successfully!',
        variant: 'success'
      });
    } catch {
      showToast({
        id: ADD_NOTE_REJECTED,
        message: "The note was'nt saved, try again later.",
        variant: 'error'
      });
    }
  });

  return (
    <Modal.Dialog show={isOpen} onHide={onHide} size="xSmall">
      <Flex bg="background-01" pl={5} borderBottom="1px solid" borderBottomColor="neutral-700">
        <Modal.Title>Add Note</Modal.Title>
        <StyledModalHeader>
          <Modal.Close />
        </StyledModalHeader>
      </Flex>
      <Form onSubmit={onSubmit} width="100%">
        <Modal.Body>
          <Grid columnGap={4} rowGap={5} gridTemplateColumns="1fr">
            <Controller
              control={form.control}
              name="content"
              defaultValue=""
              render={({ field, fieldState }) => (
                <FormItem label="Note" name={field.name}>
                  <Spacer spaceY={0.5} direction="vertical">
                    <Textarea
                      placeholder="Enter the note"
                      validationStatus={!!fieldState.error?.message ? `error` : undefined}
                      {...field}
                    />
                    {fieldState.error?.message && (
                      <Typography variant="caption" color="red-800">
                        {fieldState.error?.message}
                      </Typography>
                    )}
                  </Spacer>
                </FormItem>
              )}
            />
          </Grid>
        </Modal.Body>

        <Flex
          bg="background-01"
          px={5}
          py={4}
          spaceX={5}
          justifyContent="flex-end"
          position="sticky"
          bottom={0}
          left={0}
          borderTop="1px solid"
          borderTopColor="neutral-700"
        >
          <Button variant="destructive" disabled={form.formState.isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={Object.keys(form.formState.errors).length > 0}>
            {form.formState.isSubmitting ? <Icon component={SpinnerOutlined} spin /> : 'Save'}
          </Button>
        </Flex>
      </Form>
    </Modal.Dialog>
  );
};
