-- DropForeignKey
ALTER TABLE "envelopes" DROP CONSTRAINT "envelopes_user_id_fkey";

-- AddForeignKey
ALTER TABLE "envelopes" ADD CONSTRAINT "envelopes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
