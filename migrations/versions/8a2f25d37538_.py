"""empty message

Revision ID: 8a2f25d37538
Revises: 58a21d746106
Create Date: 2023-09-30 05:35:26.866721

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a2f25d37538'
down_revision = '58a21d746106'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reset_tokens',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('token', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['email'], ['user.email'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.drop_table('reset_token')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reset_token',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('token', sa.VARCHAR(length=250), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['email'], ['user.email'], name='reset_token_email_fkey'),
    sa.PrimaryKeyConstraint('id', name='reset_token_pkey'),
    sa.UniqueConstraint('token', name='reset_token_token_key')
    )
    op.drop_table('reset_tokens')
    # ### end Alembic commands ###