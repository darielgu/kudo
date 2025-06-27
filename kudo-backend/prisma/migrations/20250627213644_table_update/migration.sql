-- AlterTable
ALTER TABLE "Cards" ALTER COLUMN "board_id" DROP DEFAULT;
DROP SEQUENCE "Cards_board_id_seq";
