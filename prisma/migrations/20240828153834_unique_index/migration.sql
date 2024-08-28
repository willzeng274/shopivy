-- Add unique index for (itemId, userId) when ordered = false
CREATE UNIQUE INDEX unique_item_user_when_order_false
ON public."CartItem" ("itemId", "userId")
WHERE "ordered" = false;
