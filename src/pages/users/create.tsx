import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type createUserFormData = {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório."),
  email: yup.string().required("E-mail obrigatório.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Senha obrigatória.")
    .min(6, "A senha precisa ter ao menos 6 caracteres."),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisão ser iguais"),
});

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<createUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          rounded="8"
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input
                error={errors.name}
                {...register("name")}
                name="name"
                label="Nome completo"
              />
              <Input
                error={errors.email}
                {...register("email")}
                name="email"
                type="email"
                label="E-mail"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input
                error={errors.password}
                {...register("password")}
                name="password"
                type="password"
                label="Senha"
              />
              <Input
                error={errors.password_confirmation}
                {...register("password_confirmation")}
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
