
library ieee;
use ieee.std_logic_1164.all;

entity tb_Take4 is
end tb_Take4 ;

architecture behav of tb_Take4  is
  -- component
  component Take4 is 
  port(

    -- input
    clk : in std_logic;
    H : in std_logic_vector(7 downto 1);
    e_prd :in std_logic_vector(3 downto 0);
    seed : in std_logic_vector(15 downto 0);
    -- output
    errorH : out std_logic_vector(7 downto 1)
  );
end component;
  -- signals 
signal sig_seed :std_logic_vector(15 downto 0);
signal sig_clk :std_logic;
signal sig_e_prd : std_logic_vector(3 downto 0);
signal sig_H : std_logic_vector(7 downto 1);
signal sig_errorH : std_logic_vector(7 downto 1);
begin

u1: Take4 port map (sig_clk,sig_H,sig_e_prd,sig_seed,sig_errorH);

process
begin
sig_seed<="1001011010101100";        sig_e_prd<="1011";
wait for 5 ns;
end process;

process
begin
sig_clk<='0';
wait for 5 ns;
sig_clk<='1';
wait for 5 ns;
end process;

process
begin
sig_H<="1100001";
wait for 2.5 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100000";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100000";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

sig_H<="1100000";
wait for 10 ns;

sig_H<="1100001";
wait for 10 ns;

end process;



 -- fill in your implementation here 
end behav;
