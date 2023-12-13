-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_envelope_id_fkey";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_envelope_id_fkey" FOREIGN KEY ("envelope_id") REFERENCES "envelopes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
