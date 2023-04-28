/** @format */
import { Field, FieldProps, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";

function TokenForm() {
  const toast = useToast({
    position: "bottom-right",
  });

  useEffect(() => {
    (async () => {
      const { Mina, isReady, PublicKey } = await import("snarkyjs");
      const { Add } = await import("../../../contracts/build/src/");

      await isReady;

      // Update this to use the address (public key) for your zkApp account.
      // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
      // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
      const zkAppAddress = "";
      // This should be removed once the zkAppAddress is updated.
      if (!zkAppAddress) {
        console.error(
          'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
        );
      }
      //const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
    })();
  }, []);

  function validate(value: string) {
    let error;
    if (!value) {
      error = " is required";
    }
    return error;
  }

  function validateNumber(value: number) {
    let error;
    if (isNaN(value)) {
      error = " is required";
    } else if (value < 0) {
      error = " must be equal or greater then 0";
    }
    return error;
  }

  return (
    <>
      <Box p={4} w={400} bg={"whiteAlpha.900"}>
        <Formik
          initialValues={{
            token: "",
            symbol: "",
            initQuantity: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              const minaWallet = (window as any).mina;
              if (!minaWallet) {
                toast({
                  title: "Please install a wallet",
                  status: "error",
                });
                actions.setSubmitting(false);
                return;
              }

              // const { Mina, isReady, PublicKey } = await import("snarkyjs");
              // const { TokenContract } = await import("../../../contracts/build/src/");

							// const accounts = await minaWallet.getAccounts()
              // const tx = await Mina.transaction(() => {
              //   const TokenSmartContract = new TokenContract(
              //     accounts[0]
              //   );
              //   TokenSmartContract.init(values.symbol);
              // });

              // await tx.prove();

              // const { hash } = await minaWallet.sendTransaction({
              //   transaction: tx.toJSON(),
              //   feePayer: {
              //     fee: "",
              //     memo: "zk",
              //   },
              // });

              // console.log(hash);
              actions.setSubmitting(false);
            } catch (error: any) {
              toast({
                title: error.message,
                status: "error",
              });
              actions.setSubmitting(false);
            }
          }}
        >
          {(props) => (
            <Form>
              <Field name="token" validate={validate}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    mb={4}
                    isInvalid={!!form.errors.token && !!form.touched.token}
                  >
                    <FormLabel>Token Name</FormLabel>
                    <Input {...field} placeholder="Token Name" />
                    <FormErrorMessage>
                      {"Token Name" + form.errors.token}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="symbol" validate={validate}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    mb={4}
                    isInvalid={!!form.errors.symbol && !!form.touched.symbol}
                  >
                    <FormLabel>Symbol</FormLabel>
                    <Input {...field} placeholder="Symbol" />
                    <FormErrorMessage>
                      {"Symbol" + form.errors.symbol}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="initQuantity" validate={validateNumber}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    mb={4}
                    isInvalid={
                      !!form.errors.initQuantity && !!form.touched.initQuantity
                    }
                  >
                    <FormLabel>Init Quantity</FormLabel>
                    <Input
                      {...field}
                      placeholder="Init Quantity"
                      type="number"
                    />
                    <FormErrorMessage>
                      {"Init Quantity" + form.errors.initQuantity}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                w="100%"
                borderRadius={0}
                bg="orange"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default TokenForm;
