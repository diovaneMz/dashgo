import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  currentPage: number;
  isCurrent?: boolean;
}

export function PaginationItem({ currentPage, isCurrent = false }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
      >
        {currentPage}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
    >
      {currentPage}
    </Button>
  );
}
