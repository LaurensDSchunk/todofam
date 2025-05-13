export default function useDialogs() {
  const householdCreateDialogOpen = useState<boolean>(
    "household-create-dialog-open",
    () => false,
  );

  const householdSwitchDialogOpen = useState<boolean>(
    "household-switch-dialog-open",
    () => false,
  );

  const createTaskDialogOpen = useState<boolean>(
    "task-create-dialog-open",
    () => false,
  );

  return {
    householdCreateDialogOpen,
    householdSwitchDialogOpen,
    createTaskDialogOpen,
  };
}
