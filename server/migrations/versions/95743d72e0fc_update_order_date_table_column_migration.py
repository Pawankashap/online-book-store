"""update order date table column migration

Revision ID: 95743d72e0fc
Revises: bffd7da15642
Create Date: 2023-10-14 14:19:09.322623

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95743d72e0fc'
down_revision = 'bffd7da15642'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('orderdt', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'orderdt')
    # ### end Alembic commands ###